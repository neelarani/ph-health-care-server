import bcrypt from 'bcryptjs';
import { prisma } from '@/app/shared';
import env from '@/config/env';
import { Request } from 'express';
import { fileUploder, paginationHelper } from '@/app/helper';
import { Admin, Prisma, UserRole } from '@prisma/client';
import { IOptions } from '@/app/helper/paginationHelper';
import { userSearchableFields } from './user.constant';

export const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploder.uploadToCloudinary(req.file);

    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }
  const hashPassword = bcrypt.hashSync(req.body.password, env.bcryptSaltRound);

  const result = await prisma.$transaction(async tnx => {
    await tnx.user.create({
      data: {
        email: req.body?.patient?.email,
        password: hashPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient,
    });
  });
  return result;
};

export const createAdmin = async (req: Request): Promise<Admin> => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await fileUploder.uploadToCloudinary(file);
    req.body.admin.profilePhoto = uploadToCloudinary?.secure_url;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 10);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const createDoctor = async (req: Request) => {
  const file = req.file;
  if (file) {
    const uploadResult = await fileUploder.uploadToCloudinary(file);

    req.body.doctor.profilePhoto = uploadResult?.secure_url;
  }
  const hashedPassword = bcrypt.hashSync(
    req.body.password,
    env.bcryptSaltRound
  );

  const userData = {
    email: req.body.doctor.email,
    password: hashedPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async transactionClient => {
    await transactionClient.user.create({
      data: userData,
    });

    const createDoctorData = await transactionClient.doctor.create({
      data: req.body.doctor,
    });
    return createDoctorData;
  });
  return result;
};

export const getAllFormDB = async (params: any, options: IOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const addConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    addConditions.push({
      OR: userSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    addConditions.length > 0
      ? {
          AND: addConditions,
        }
      : {};

  const result = await prisma.user.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
