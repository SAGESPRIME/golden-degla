/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-light": "var(--primary-light)",
        accent: "var(--accent)",
        "accent-light": "var(--accent-light)",
        surface: "var(--surface)",
        border: "var(--border)",
        text: "var(--text)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        bg: "var(--bg)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'warm-sm': '0 1px 3px 0 rgba(139, 115, 85, 0.08), 0 1px 2px -1px rgba(139, 115, 85, 0.08)',
        'warm': '0 4px 6px -1px rgba(139, 115, 85, 0.1), 0 2px 4px -2px rgba(139, 115, 85, 0.08)',
        'warm-md': '0 10px 15px -3px rgba(139, 115, 85, 0.12), 0 4px 6px -4px rgba(139, 115, 85, 0.08)',
        'warm-lg': '0 20px 25px -5px rgba(139, 115, 85, 0.15), 0 8px 10px -6px rgba(139, 115, 85, 0.08)',
        'warm-xl': '0 25px 50px -12px rgba(139, 115, 85, 0.25)',
        'glow': '0 0 40px rgba(184, 134, 11, 0.15)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out both',
        'fade-in-up-delay-1': 'fadeInUp 0.6s ease-out 0.1s both',
        'fade-in-up-delay-2': 'fadeInUp 0.6s ease-out 0.2s both',
        'fade-in-up-delay-3': 'fadeInUp 0.6s ease-out 0.3s both',
        'fade-in-up-delay-4': 'fadeInUp 0.6s ease-out 0.4s both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-delay': 'float 4s ease-in-out 1s infinite',
        'scale-in': 'scaleIn 0.4s ease-out both',
        'slide-in-right': 'slideInRight 0.5s ease-out both',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      transitionTimingFunction: {
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, var(--primary-light) 0%, #FFFBF5 60%, var(--accent-light) 100%)',
      },
    },
  },
  plugins: [],
}
