/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'neo-yellow': '#FFFF00',
                'neo-pink': '#FF69B4',
                'neo-blue': '#00FFFF',
                'neo-black': '#000000',
            },
            boxShadow: {
                'neo': '4px 4px 0 0 #000000',
            },
        },
    },
    plugins: [],
}