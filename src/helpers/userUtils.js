// Put your computations here.

function getParentPath(pageUrl) {
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
}

function userComputed(data) {
  return {
    getParentPath
  };
}

exports.userComputed = userComputed;
