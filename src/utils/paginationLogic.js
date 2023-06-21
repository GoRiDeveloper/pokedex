export const paginationLogic = ({

    pagesPerBlock,
    elementsPerPage,
    elements,
    currentPage

}) => {

    const startSlice = (currentPage - 1) * elementsPerPage;
    const endSlice = startSlice + elementsPerPage;

    const elementsInPage = elements.slice(startSlice, endSlice);

    const lastPage = Math.ceil(elements.length / elementsPerPage) || 1; 
    const currentBlock = Math.ceil(currentPage / pagesPerBlock);
    const pagesInBlock = [];
    const minPage = (currentBlock - 1) * pagesPerBlock + 1;
    const maxPage = currentBlock * pagesPerBlock;

    for (let i = minPage; i <= maxPage; i++) 
        if (i <= lastPage)
            pagesInBlock.push(i);

    return { elementsInPage, lastPage, pagesInBlock };

};