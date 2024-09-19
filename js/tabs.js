const tabList = document.querySelector('[role="tablist"');
const tabs = tabList.querySelectorAll('[role="tab"');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;

// This is all about keyboard navigation (accessibility).
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode !== keydownLeft && e.keyCode !== keydownRight) return;

  tabs[tabFocus].setAttribute("tabindex", -1);

  if (e.keyCode === keydownRight) tabFocus++;
  if (e.keyCode === keydownLeft) tabFocus--;

  if (tabFocus >= tabs.length) tabFocus = 0;
  if (tabFocus < 0) tabFocus = tabs.length - 1;

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

// When we click or select a tab, we change the content
function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // change the active tab
  tabContainer
    .querySelector('[aria-selected="true"')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);

  // change the content
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  // change the picture
  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}
