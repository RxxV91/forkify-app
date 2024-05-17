import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _curPage;

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    this._curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    //console.log(numPages);
    // Page 1, there are other pages
    if (this._curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next');
    }

    // Last page
    if (this._curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('previous');
    }
    // Other pages
    if (this._curPage < numPages) {
      return (
        this._generateMarkupButton('previous') +
        this._generateMarkupButton('next')
      );
    }

    // Page 1, no other pages

    return '';
  }

  _generateMarkupButton(page) {
    if (page === 'previous') {
      return `
        <button data-goto="${
          this._curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this._curPage - 1}</span>
        </button>
        `;
    }

    if (page === 'next') {
      return `
        <button data-goto="${
          this._curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> 
         `;
    }
  }
}

export default new PaginationView();
