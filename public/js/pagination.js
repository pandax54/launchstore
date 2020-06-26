if (pagination) {

    function paginate(selectedPage, totalPages) {

        let pages = []
        let oldPage;


        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

            let firstAndLastPage = currentPage == 1 || currentPage == totalPages;
            let beforePages = currentPage >= selectedPage - 2;
            let afterPages = currentPage <= selectedPage + 2;

            if (firstAndLastPage || beforePages && afterPages) {

                if (oldPage && currentPage - oldPage > 2) {

                    pages.push('...')
                }

                if (oldPage && currentPage - oldPage == 2) {


                    pages.push(oldPage + 1)

                }

                oldPage = currentPage;
                pages.push(currentPage)
            }

        }
        return pages
    }

    function createPagination(pagination) {
        // turn string into number
        const page = +pagination.dataset.page
        const total = +pagination.dataset.total

        // (selectedPage, totalPage)
        const pages = paginate(page, total)

        console.log(pages)

        let elements = ""

        for (let page of pages) {
            // remove the '...' from the href logic
            // you need to convert the page into string to use .includes()
            if (String(page).includes('...')) {

                elements += `<span>${page}</span> `

            } else {

                elements += `<a href="?page=${page}">${page}</a> `

            }
        }

        // != document.createTextNode() and .append(text)
        pagination.innerHTML = elements

    }



    const pagination = document.querySelector('.pagination');

}