function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  // The eleventyConfig parameter stands for the the config instantiated in /.eleventy.js.
  // Feel free to add any plugin you want here instead of /.eleventy.js
  
  // Add getParentPath as a global function
  eleventyConfig.addNunjucksGlobal("getParentPath", function(pageUrl) {
    if (!pageUrl || pageUrl === '/') {
      return null;
    }
    
    // Remove leading and trailing slashes
    const cleanUrl = pageUrl.replace(/^\/+|\/+$/g, '');
    
    // Split the URL into parts
    const parts = cleanUrl.split('/');
    
    // If we're at the root of a section (e.g., /case-studies/), return null
    if (parts.length <= 1) {
      return null;
    }
    
    // Return the parent section with proper formatting
    const parentSection = parts[0];
    
    // Convert kebab-case to Title Case for display
    return parentSection
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
