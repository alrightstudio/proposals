import '../styles/main.scss';
import TableOfContents from '../components/table-of-contents';

const mainContentArea = document.querySelector('.proposal-body');
const proposalSections = document.querySelectorAll('.proposal-section');
const toc = document.querySelector('.toc');
const scrollingTocBlocks = document.querySelectorAll('.scrolling-toc-block');
const tocTitles = document.querySelectorAll('.toc-title');
const scrollingTocTitles = document.querySelectorAll('.scrolling-toc-title');
const desktopBreakpoint = 768;

TableOfContents({
	mainContentArea,
	proposalSections,
	toc,
	scrollingTocBlocks,
	tocTitles,
	scrollingTocTitles,
	desktopBreakpoint
});