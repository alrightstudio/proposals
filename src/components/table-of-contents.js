export default ({
	mainContentArea,
	proposalSections,
	toc,
	scrollingTocBlocks,
	tocTitles,
	scrollingTocTitles,
	desktopBreakpoint
}) => {
	function onScroll() {
		if (window.innerWidth >= desktopBreakpoint) {
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
			
			// This stops the scrolling effect once the user gets to the footer
			const maxPosition = mainContentArea.offsetTop + mainContentArea.offsetHeight - toc.offsetHeight;
			
			if (window.pageYOffset >= maxPosition) {
				toc.style.position = 'absolute';
				toc.style.top = `${maxPosition}px`;
			} else {
				toc.style.position = 'fixed';
				toc.style.top = null;
			}
		} else {
			tocTitles.forEach(function(tocTitle) {
				tocTitle.classList.remove('hidden');
			});

			toc.style.position = null;
			toc.style.top = null;
		}
	}
	window.addEventListener('scroll', onScroll);
	window.addEventListener('resize', onScroll);
	
	onScroll();
};