/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                gedinar: ["'GE Dinar One Light'", "sans-serif"],
                dinarBold: ['GE Dinar One', 'sans-serif'],
            },
        },
    },
    plugins: [],
};