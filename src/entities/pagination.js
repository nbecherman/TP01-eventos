class Pagination {
    static BuildPagination(collection,total, limit, offset) {
        const currentPage = (offset / limit); //pagina actual
        const totalPages = (total / limit); //total de paginas
        return {
            collection: collection,
            pagination: {
                limit: limit,
                offset: offset,
                currentPage: currentPage,
                totalPages: totalPages,
                total: total,
                NextPage: currentPage < totalPages, //booleano, si hay pagina siguiente
                PreviousPage: currentPage > 1
            }
        };
    }
}

export default Pagination;