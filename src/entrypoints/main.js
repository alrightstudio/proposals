/* eslint-disable indent-legacy */
/* eslint-disable no-extra-semi */
import '../styles/main.scss';

const mainContentArea = document.querySelector('.proposal-body');
const proposalSections = document.querySelectorAll('.proposal-section');
const toc = document.querySelector('.toc');
const scrollingTocBlocks = document.querySelectorAll('.scrolling-toc-block');
const tocTitles = document.querySelectorAll('.toc-title');
const scrollingTocTitles = document.querySelectorAll('.scrolling-toc-title');

window.addEventListener('scroll', function() {
    // This hides and shows the section titles to mimic the stacking effect
    for (let i = 0; i < proposalSections.length; i++) {
        const topOfScrollingTocBlock = scrollingTocBlocks[i].getBoundingClientRect().top;
        const topOfProposalSection = proposalSections[i].getBoundingClientRect().top;
        
        if (topOfScrollingTocBlock >= topOfProposalSection) {
            tocTitles[i].classList.add('hidden');
            scrollingTocTitles[i].classList.remove('hidden');
        } else {
            tocTitles[i].classList.remove('hidden');
            scrollingTocTitles[i].classList.add('hidden');     
        }
    }
    
    // This stops the scrolling effect onc the user gets to the footer
    const maxPosition = mainContentArea.offsetTop + mainContentArea.offsetHeight - toc.offsetHeight;

    if (window.pageYOffset >= maxPosition) {
        toc.setAttribute('style', 'position: absolute; top: ' + maxPosition + 'px;');
    } else {
        toc.setAttribute('style', 'position: fixed; top:' + null + ';');
    }
});