setTimeout(() => {
  const targetClassName =
    ".timeline-side-panel-pulse-column.timeline-side-panel-pulse-column-title";
  const infoDiv = document.createElement("div");
  infoDiv.id = "hover-info";
  infoDiv.style.display = "none";
  infoDiv.style.position = "absolute";
  document.body.appendChild(infoDiv);

  function showInfoDiv(event, targetElement) {
    console.log("Mouse entered target element");
    const targetElementRect = targetElement.getBoundingClientRect();
    infoDiv.style.display = "block";
    infoDiv.style.top =
      targetElementRect.top +
      window.scrollY +
      targetElementRect.height / 2 -
      infoDiv.offsetHeight / 2 +
      "px";
    infoDiv.style.left = targetElementRect.left + window.scrollX + "px";
    infoDiv.textContent = targetElement.textContent;
  }

  function hideInfoDiv() {
    console.log("Mouse left target element");
    infoDiv.style.display = "none";
  }

  function addTargetListeners(targetElements) {
    for (let targetElement of targetElements) {
      if (!targetElement.dataset.hoverInfoAdded) {
        console.log("Adding event listeners to target element");
        targetElement.addEventListener("mouseenter", (event) => {
          showInfoDiv(event, targetElement);
        });
        targetElement.addEventListener("mouseleave", hideInfoDiv);
        targetElement.dataset.hoverInfoAdded = true;
      }
    }
  }

  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        const targetElements = document.querySelectorAll(targetClassName);
        addTargetListeners(targetElements);
      }
    }
  });

  const observerConfig = {
    childList: true,
    subtree: true,
  };

  observer.observe(document.body, observerConfig);

  // Initial addTargetListeners call for elements already on the page
  const targetElements = document.querySelectorAll(targetClassName);
  addTargetListeners(targetElements);
}, 3000);
