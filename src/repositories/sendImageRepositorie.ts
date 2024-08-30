import prismaClient from "../prisma";

export const findMeasurementRepository = (customerCode: string, measureType: 'WATER' | 'GAS', monthYear: string) => {
    const [month, year] = monthYear.split("-");

    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 1);

    return prismaClient.measurement.findFirst({
    where: {
        customerCode,
        measureType,
        measureDateTime: {
            gte: startDate,  // Maior ou igual à data de início do mês
            lt: endDate,     // Menor que a data de início do próximo mês
        },
    },});
}