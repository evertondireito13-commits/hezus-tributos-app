export default function Logo() {
  return (
    <svg
      viewBox="0 0 260 60"
      className="h-8 md:h-10 w-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="chrome" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            result="noise"
          />
          <feDiffuseLighting
            in="SourceGraphic"
            surfaceScale="2"
            diffuseConstant="1.1"
            lightingColor="#ffffff"
            result="light"
          >
            <feDistantLight azimuth="235" elevation="55" />
          </feDiffuseLighting>
          <feComposite
            in="light"
            in2="SourceAlpha"
            operator="in"
            result="litText"
          />
          <feSpecularLighting
            in="SourceGraphic"
            surfaceScale="2"
            specularConstant="1.4"
            specularExponent="18"
            lightingColor="#ffffff"
            result="spec"
          >
            <feDistantLight azimuth="235" elevation="55" />
          </feSpecularLighting>
          <feComposite
            in="spec"
            in2="SourceAlpha"
            operator="in"
            result="specText"
          />
          <feMerge>
            <feMergeNode in="litText" />
            <feMergeNode in="specText" />
          </feMerge>
        </filter>

        <linearGradient id="metalBase" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F4F5F7" />
          <stop offset="30%" stopColor="#9A9DA5" />
          <stop offset="50%" stopColor="#E8E9EC" />
          <stop offset="70%" stopColor="#6E7178" />
          <stop offset="100%" stopColor="#B8BAC0" />
        </linearGradient>
      </defs>

      <text
        x="0"
        y="44"
        fontFamily="Manrope, Arial, sans-serif"
        fontWeight="800"
        fontSize="46"
        letterSpacing="1"
        fill="url(#metalBase)"
        filter="url(#chrome)"
      >
        HEZUS
      </text>
    </svg>
  )
}
