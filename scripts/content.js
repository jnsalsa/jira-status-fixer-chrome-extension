// Configuration - change these values
const CONFIG = {
    sourceSelector: 'div[data-testid="issue.views.issue-base.foundation.status.status-field-wrapper"]',
    targetSelector: 'div[data-testid="issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval"] div',
};



function waitForElement(selector, callback) {
    const element = document.querySelector(selector);
    if (element) {
        callback(element);
    } else {
        setTimeout(() => waitForElement(selector, callback), 100);
    }
}

function moveContent() {
    const sourceDiv = document.querySelector(CONFIG.sourceSelector);
    const targetDiv = document.querySelector(CONFIG.targetSelector);
    
    if (sourceDiv && targetDiv) {
        while (sourceDiv.firstChild) {
            targetDiv.prepend(sourceDiv.firstChild);
        }
    }
}

// Wait for both elements to exist
waitForElement(CONFIG.sourceSelector, () => {
    waitForElement(CONFIG.targetSelector, moveContent);
});

// Handle dynamic content
const observer = new MutationObserver(() => {
    const sourceDiv = document.querySelector(CONFIG.sourceSelector);
    const targetDiv = document.querySelector(CONFIG.targetSelector);
    
    if (sourceDiv && targetDiv && sourceDiv.children.length > 0) {
        moveContent();
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});