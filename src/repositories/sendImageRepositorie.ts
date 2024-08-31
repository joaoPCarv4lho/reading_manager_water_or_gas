import prismaClient from "../prisma";

export const findMeasurementRepository = (customerCode: string, measureType: 'WATER' | 'GAS', monthYear: string) => {
    // Validar o formato e valores de monthYear
    const [month, year] = monthYear.split("-");
    if (!month || !year || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
        console.log(month, year)
        throw new Error('Invalid monthYear format');
    }

    // Criar datas para o início e o final do mês
    const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
    const endDate = new Date(parseInt(year), parseInt(month), 1);

    // Validar se as datas são válidas
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid date generated');
    }

    return prismaClient.measurement.findFirst({
        where: {
            customerCode,
            measureType,
            measureDateTime: {
                gte: startDate,  // Maior ou igual à data de início do mês
                lt: endDate,     // Menor que a data de início do próximo mês
            },
        },
    });
}
