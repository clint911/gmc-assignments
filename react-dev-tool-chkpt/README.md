# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Minimal Studio SPA - Comprehensive Debugging Guide

This document provides detailed documentation on debugging the Minimal Studio single-page application using React Developer Tools and other debugging techniques.

## Table of Contents
1. [Application Overview](#application-overview)
2. [Debugging Tools Setup](#debugging-tools-setup)
3. [Debugging Navigation System](#debugging-navigation-system)
4. [Debugging Scroll Behavior](#debugging-scroll-behavior)
5. [Debugging State Management](#debugging-state-management)
6. [Debugging Responsive Design](#debugging-responsive-design)
7. [Debugging Form Functionality](#debugging-form-functionality)
8. [Performance Debugging](#performance-debugging)
9. [Verification Process](#verification-process)
10. [Common Issues & Solutions](#common-issues--solutions)

## Application Overview

The Minimal Studio SPA is a single-page application built with React that features:

- 5 main sections: Landing, About, Services, Portfolio, Contact
- Fixed navigation bar with active section highlighting
- Smooth scrolling to sections
- Intersection Observer for tracking active sections
- Responsive design for all device sizes
- Minimalist black and white aesthetic

Key technologies:
- React (v18+)
- React Hooks (useState, useEffect, useRef)
- CSS for styling
- Intersection Observer API

## Debugging Tools Setup

### Essential Tools:
1. **React Developer Tools**
   - Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/)
   - Provides component hierarchy inspection
   - State and props visualization
   - Hook debugging capabilities

2. **Browser Developer Tools**
   - Elements/Inspector tab for DOM structure
   - Console for JavaScript errors
   - Network tab for API requests
   - Performance tab for rendering metrics

### Configuration Steps:
1. Install React Developer Tools browser extension
2. Open your browser's developer tools (F12)
3. Navigate to the "Components" tab in React DevTools
4. Select the "⚛️ Components" and "⚛️ Profiler" tabs

## Debugging Navigation System

### Issue: Active section not updating
**Symptoms:** Navigation highlights incorrect section when scrolling

**Debugging Process:**
1. Open React DevTools and select the `App` component
2. Check the `activeSection` state value
3. Scroll through the page and observe if state updates correctly
4. If not, inspect the Intersection Observer:
   ```jsx
   // Verify observer configuration
   const observerOptions = {
     root: null,
     rootMargin: '0px',
     threshold: 0.5 // 50% visibility required
   };

   Check if refs are properly assigned to sections:
```jsx

    // In React DevTools, inspect the refs object
    sectionsRef.current = {
      landing: <section element>,
      about: <section element>,
      // ...
    }

    Verify each section has a valid ID that matches the ref keys

Solution:
```jsx

// Ensure sections have matching IDs and refs
<section 
  id="about" 
  ref={el => sectionsRef.current.about = el}
>

Debugging Scroll Behavior
Issue: Scrolling jumps abruptly

Symptoms: Clicking nav links causes instant jump instead of smooth scroll

Debugging Process:

    Test scrollToSection function in React DevTools:

        Select the App component

        Find the scrollToSection function in the hooks section

        Execute manually in console:
        ```js

    $r.scrollToSection('about')

Verify scroll options:
```jsx

element.scrollIntoView({ 
  behavior: 'smooth', 
  block: 'start' 
});

Check if CSS smooth scrolling is enabled:
```css

    html {
      scroll-behavior: smooth; /* Should be present */
    }

    Verify section refs are not null

Solution:
```jsx

// Add null check before scrolling
const scrollToSection = (sectionId) => {
  const element = sectionsRef.current[sectionId];
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

Debugging State Management
Issue: State not updating correctly

Symptoms: UI not reflecting current state values

Debugging Process:

    In React DevTools:

        Select the App component

        Check the activeSection state value

        Verify shows state if using conditional rendering

    Add state logging in useEffect:
    ```jsx

useEffect(() => {
  console.log('Active section changed:', activeSection);
}, [activeSection]);

Use React DevTools "Hooks" section to inspect:

    Current state values

    Hook dependencies

Check for stale state with useRef:
```jsx

    const isMountedRef = useRef(true);

    useEffect(() => {
      return () => {
        isMountedRef.current = false;
      };
    }, []);

Solution:
```jsx

// Functional update to prevent stale state
setActiveSection(prevSection => 
  prevSection !== newSection ? newSection : prevSection
);

Debugging Responsive Design
Issue: Layout breaks on mobile devices

Symptoms: Elements overlapping, incorrect spacing on small screens

Debugging Process:

    Use browser's responsive design mode (Ctrl+Shift+M)

    Inspect media queries in Styles tab:
   ``` css

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }
}

Check computed styles for elements

Verify viewport meta tag:
html

    <meta name="viewport" content="width=device-width, initial-scale=1" />

    Use React DevTools to inspect component sizes:

        Hover over components to see dimensions

        Check padding/margin values

Solution:
```css

/* Add responsive breakpoints */
@media (max-width: 480px) {
  .nav-links {
    flex-wrap: wrap;
  }
  
  .section {
    padding: 4rem 1rem;
  }
}

Debugging Form Functionality
Issue: Form not submitting data

Symptoms: Form inputs not capturing data, submit not working

Debugging Process:

    Add form state management:
    ```jsx

const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const handleChange = (e) => {
  setFormData({...formData, [e.target.id]: e.target.value});
};

Verify input bindings:
```jsx

<input 
  id="name"
  value={formData.name}
  onChange={handleChange}
/>

Check form submission handler:
```jsx

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form data:', formData);
      // API submission logic
    };

    Use React DevTools to inspect form state values

Solution:
```jsx

// Add proper form validation
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Basic validation
  if (!formData.name || !formData.email) {
    setError('Please fill in all required fields');
    return;
  }
  
  // Submit logic
};

Performance Debugging
Issue: Scrolling performance issues

Symptoms: Janky scrolling, high CPU usage

Debugging Process:

    Use React DevTools Profiler:

        Click "Record" in Profiler tab

        Scroll through the page

        Stop recording and analyze flamegraph

    Identify expensive components

    Check for unnecessary re-renders:
    ```jsx

// Wrap components in React.memo
const MemoizedSection = React.memo(SectionComponent);

Verify Intersection Observer cleanup:
```jsx

useEffect(() => {
  // Setup observer
  
  return () => {
    // Cleanup observer
    observer.disconnect();
  };
}, []);

Use console.time to measure functions:
```js

    console.time('scrollToSection');
    // Scroll function
    console.timeEnd('scrollToSection');

Solution:
```jsx

// Optimize scroll handler with throttling
import throttle from 'lodash/throttle';

const handleScroll = throttle(() => {
  // Scroll logic
}, 100);

window.addEventListener('scroll', handleScroll);

Verification Process
Functional Verification

    Navigation Test:

        Click each nav link → Verify correct section scrolls into view

        Manually scroll → Verify active section highlights correctly

    Responsive Test:

        Test on mobile (≤480px), tablet (768px), desktop (≥1024px)

        Verify proper layout at each breakpoint

        Test navigation menu on mobile

    Form Test:

        Fill out all fields → Verify data captured

        Submit form → Verify success state

        Test validation with incomplete data

    Performance Test:

        Scroll through entire page → Verify smoothness

        Record performance metrics using DevTools

        Verify no memory leaks with React DevTools

Debugging Verification

    React DevTools Inspection:

        Verify component hierarchy

        Check state and props values

        Test hook functionality

    Console Verification:

        Confirm no errors or warnings

        Verify debug logs show correct information

    Cross-browser Testing:

        Chrome, Firefox, Safari

        Edge (Chromium-based)

Common Issues & Solutions
1. Active section not updating

    Cause: Intersection Observer threshold too high

    Fix: Reduce threshold to 0.3
    ```js

    threshold: 0.3 // 30% visibility

2. Navigation not working on Safari

    Cause: Scroll behavior polyfill missing

    Fix: Add smooth scroll polyfill
   ``` bash

npm install smoothscroll-polyfill

```js

    import smoothscroll from 'smoothscroll-polyfill';
    smoothscroll.polyfill();

3. Form data not persisting

    Cause: Missing name attributes on inputs

    Fix: Add proper name attributes
    ```jsx

    <input name="email" id="email" />

4. Images not loading

    Cause: Incorrect image paths or CORS issues

    Fix: Use relative paths and verify CORS headers
    ```jsx

    // Use public folder for images
    <img src="/images/team.jpg" alt="Our team" />

5. Layout shift on load

    Cause: Images without dimensions

    Fix: Add width/height attributes
    ```jsx

    <img 
      src="team.jpg" 
      alt="Our team" 
      width="600"
      height="400"
    />

6. Memory leak warning

    Cause: Unmounted component state update

    Fix: Use cleanup functions
   ``` jsx

    useEffect(() => {
      let isMounted = true;
      
      fetchData().then(data => {
        if (isMounted) setData(data);
      });
      
      return () => { isMounted = false };
    }, []);

