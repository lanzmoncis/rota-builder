// "use server";

// import { z } from "zod";
// import { revalidatePath } from "next/cache";

// import { EmployeeFormSchema, AddShiftFormSchema } from "./schema";
// import { db } from "./db";

// type EmployeeInputs = z.infer<typeof EmployeeFormSchema>;

// type AddShiftInputs = z.infer<typeof AddShiftFormSchema>;

// export async function addEmployee(values: EmployeeInputs) {
//   const employeeDataValidation = EmployeeFormSchema.safeParse(values);

//   if (!employeeDataValidation.success) {
//     return {
//       errors: employeeDataValidation.error.flatten().fieldErrors,
//       message: "Failed to add employee.",
//     };
//   }

//   const { name, jobTitle, dateStarted, payrollId, hourlyRate } =
//     employeeDataValidation.data;

//   try {
//     const result = await db.employee.create({
//       data: {
//         name,
//         jobTitle,
//         dateStarted,
//         payrollId,
//         hourlyRate,
//       },
//     });

//     revalidatePath("/employees");
//     return result;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to add employee.",
//     };
//   }
// }

// export async function updateEmployee(
//   values: EmployeeInputs,
//   employeeId: string
// ) {
//   const employeeDataValidation = EmployeeFormSchema.safeParse(values);

//   if (!employeeDataValidation.success) {
//     return {
//       errors: employeeDataValidation.error.flatten().fieldErrors,
//       message: "Failed to add employee.",
//     };
//   }

//   const { name, jobTitle, dateStarted, payrollId, hourlyRate } =
//     employeeDataValidation.data;

//   try {
//     const result = await db.employee.update({
//       where: {
//         id: employeeId,
//       },
//       data: {
//         name,
//         jobTitle,
//         dateStarted,
//         payrollId,
//         hourlyRate,
//       },
//     });

//     revalidatePath("/employees");
//     return result;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to update employee.",
//     };
//   }
// }

// export async function deleteEmployee(employeeId: string) {
//   try {
//     await db.employee.delete({
//       where: {
//         id: employeeId,
//       },
//     });

//     revalidatePath("/employees");
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to delete employee.",
//     };
//   }
// }

// export async function addShift(
//   values: AddShiftInputs,
//   employeeId: string,
//   date: Date
// ) {
//   const addShiftDataValidation = AddShiftFormSchema.safeParse(values);

//   if (!addShiftDataValidation.success) {
//     return {
//       errors: addShiftDataValidation.error.flatten().fieldErrors,
//       message: "Failed to add shift.",
//     };
//   }

//   const { department, shiftTime } = addShiftDataValidation.data;
//   try {
//     const result = await db.shift.create({
//       data: {
//         department,
//         shiftTime,
//         date,
//         employeeId,
//       },
//     });

//     revalidatePath("/dashboard");
//     return result;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to add shift.",
//     };
//   }
// }

// export async function updateShift(values: AddShiftInputs, shiftId: string) {
//   const addShiftDataValidation = AddShiftFormSchema.safeParse(values);

//   if (!addShiftDataValidation.success) {
//     return {
//       errors: addShiftDataValidation.error.flatten().fieldErrors,
//       message: "Failed to add shift.",
//     };
//   }

//   const { department, shiftTime } = addShiftDataValidation.data;
//   try {
//     const result = await db.shift.update({
//       where: {
//         id: shiftId,
//       },
//       data: {
//         department,
//         shiftTime,
//       },
//     });

//     revalidatePath("/dashboard");
//     return result;
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to add shift.",
//     };
//   }
// }

// export async function deleteShift(shiftId: string) {
//   try {
//     await db.shift.delete({
//       where: {
//         id: shiftId,
//       },
//     });

//     revalidatePath("/dashboard");
//   } catch (error) {
//     return {
//       message: "Database Error: Failed to delete shift.",
//     };
//   }
// }
