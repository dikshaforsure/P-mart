export default function TeddyRunner() {
  return (
    <svg className="teddy-runner-svg" data-testid="teddy-runner-svg" viewBox="0 0 300 240" role="presentation" aria-hidden="true" focusable="false">
      <ellipse className="teddy-runner-shadow" data-part="ground-shadow" cx="150" cy="230" rx="92" ry="7" fill="#2a170e" opacity=".13" />
      <g className="teddy-runner-body" data-part="body">
        <g transform="translate(94 192)">
          <g className="teddy-runner-leg teddy-runner-leg--rear-far teddy-runner-leg--diagonal-a" data-part="rear-far-leg">
            <path d="M-14 -14 C-14 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 14 4 14 -14Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M-3.5 29v5 M4.5 29v5" fill="none" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
        <g transform="translate(168 192)">
          <g className="teddy-runner-leg teddy-runner-leg--front-far teddy-runner-leg--diagonal-b" data-part="front-far-leg">
            <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M-3.5 29v5 M4.5 29v5" fill="none" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
        <g className="teddy-runner-tail" data-part="tail">
          <g transform="rotate(-20 84 150)">
            <path d="M86 152 C80 146 76 140 74 136" fill="none" stroke="#2a170e" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M86 152 C80 146 76 140 74 136" fill="none" stroke="#f2be6b" strokeWidth="4" strokeLinecap="round" />
            <path d="M70 110 Q78 105 80.9 113.7 Q90.5 114.8 86.7 123.2 Q93.4 129.9 84.7 134 Q85.2 143.1 75.8 141 Q70 148.3 64.2 141 Q54.8 143.1 55.3 134 Q46.6 129.9 53.3 123.2 Q49.5 114.8 59.1 113.7 Q61.9 105 70 110Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" />
          </g>
        </g>
        <g transform="translate(110 194)">
          <g className="teddy-runner-leg teddy-runner-leg--rear-near teddy-runner-leg--diagonal-b" data-part="rear-near-leg">
            <path d="M-15 -14 C-15 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 15 4 15 -14Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M-3.5 27v5 M4.5 27v5" fill="none" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
        <path data-part="body-shape" d="M76.8 175.6 Q69 167.9 78.2 160.7 Q76.6 151.8 90.3 147.3 Q95.2 138.9 110.9 137.9 Q121.6 131.3 136.7 134 Q151.1 130.5 162.9 136.4 Q178.7 136.4 185.3 144.5 Q199.7 148.2 199.7 157.1 Q210.3 163.7 203.9 171.9 Q208.7 180.4 197 186.3 Q195.3 195.2 180.3 198 Q172.3 205.7 156.6 204.8 Q143.7 210 130 205.6 Q114.5 207.4 105.1 200.2 Q89.7 198.3 86.3 189.6 Q73.6 184.3 76.8 175.6Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        <path data-part="hindquarter" d="M182.7 196.4 Q169.4 196.9 166.6 183 Q156.1 174.1 162.3 161.5 Q159.6 147.6 171.9 142.2 Q178.2 129.7 191 134 Q203.3 128.7 210.5 140.8 Q223.1 145.2 221.3 159.3 Q228.4 171.5 218.5 181 Q216.6 195.1 203.2 195.7 Q193.3 205.1 182.7 196.4Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        <g transform="translate(186 194)">
          <g className="teddy-runner-leg teddy-runner-leg--front-near teddy-runner-leg--diagonal-a" data-part="front-near-leg">
            <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M-3.5 27v5 M4.5 27v5" fill="none" stroke="#2a170e" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        </g>
      </g>
      <g className="teddy-runner-head" data-part="head" transform="translate(0 4) rotate(0 212 100)">
        <path data-part="collar" d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154Z" fill="#a24a1a" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path data-part="heart-tag" d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
        <g className="teddy-runner-ear teddy-runner-ear--left" data-part="left-ear">
          <path d="M177.1 78.7 Q186.9 70.8 186.6 87.4 Q196 89.9 189.9 105.5 Q195.2 117.3 185.5 126 Q184.7 142.8 175.2 141.2 Q168.7 156.5 162.9 145.3 Q153.1 153.2 153.4 136.6 Q144 134.1 150.1 118.5 Q144.8 106.7 154.5 98 Q155.3 81.2 164.8 82.8 Q171.3 67.5 177.1 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(-6 174 82)" />
          <path d="M158 105 Q158 94 168 91 Q179 96 181 112 Q175 121 167 113Z" fill="#c98251" opacity=".58" />
        </g>
        <g className="teddy-runner-ear teddy-runner-ear--right" data-part="right-ear">
          <path d="M246.9 78.7 Q252.7 67.5 259.2 82.8 Q268.7 81.2 269.5 98 Q279.2 106.7 273.9 118.5 Q280 134.1 270.6 136.6 Q270.9 153.2 261.1 145.3 Q255.3 156.5 248.8 141.2 Q239.3 142.8 238.5 126 Q228.8 117.3 234.1 105.5 Q228 89.9 237.4 87.4 Q237.1 70.8 246.9 78.7Z" fill="#e4a352" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" transform="rotate(6 250 82)" />
          <path d="M266 105 Q266 94 256 91 Q245 96 243 112 Q249 121 257 113Z" fill="#c98251" opacity=".58" />
        </g>
        <path data-part="head-shape" d="M212 54 Q223.4 48.2 231.5 57.5 Q244.5 56.1 248.1 67.5 Q260.7 70.7 259.1 82.4 Q269.4 89.7 263 100 Q269.4 110.3 259.1 117.6 Q260.7 129.3 248.1 132.5 Q244.5 143.9 231.5 142.5 Q223.4 151.8 212 146 Q200.6 151.8 192.5 142.5 Q179.5 143.9 175.9 132.5 Q163.3 129.3 164.9 117.6 Q154.6 110.3 161 100 Q154.6 89.7 164.9 82.4 Q163.3 70.7 175.9 67.5 Q179.5 56.1 192.5 57.5 Q200.6 48.2 212 54Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.4" strokeLinejoin="round" strokeLinecap="round" />
        <path data-part="head-tuft" d="M195 52 Q190.7 45.8 200 43.5 Q203.2 36.9 212 40 Q220.8 36.9 224 43.5 Q233.3 45.8 229 52 Q233.3 58.2 224 60.5 Q220.8 67.1 212 64 Q203.2 67.1 200 60.5 Q190.7 58.2 195 52Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <path data-part="muzzle" d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120Z" fill="#fbe3b4" />
        <g className="teddy-runner-cheeks" data-part="cheeks">
          <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity=".85" />
          <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity=".85" />
        </g>
        <g className="teddy-runner-eyes" data-part="eyes">
          <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
          <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill="#2a170e" />
          <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
          <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
          <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
          <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
        </g>
        <g data-part="whisker-spots" fill="#9a7550" opacity=".78">
          <circle cx="195" cy="124" r="1.5" />
          <circle cx="201" cy="128" r="1.4" />
          <circle cx="207" cy="124" r="1.2" />
          <circle cx="217" cy="124" r="1.2" />
          <circle cx="223" cy="128" r="1.4" />
          <circle cx="229" cy="124" r="1.5" />
        </g>
        <path data-part="nose" d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5Z" fill="#2a170e" />
        <path data-part="mouth" d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2" fill="none" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path data-part="tongue" d="M207.6 127.4 Q212 136.6 216.4 127.4Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="2.2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
