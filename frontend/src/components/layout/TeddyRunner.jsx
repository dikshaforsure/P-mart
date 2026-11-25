export default function TeddyRunner() {
  return (
    <svg
      className="teddy-runner-svg"
      data-testid="teddy-runner-svg"
      viewBox="0 0 300 240"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse className="teddy-runner-shadow" data-part="ground-shadow" cx="151" cy="221" rx="105" ry="7" fill="#4b2b17" opacity=".13" />

      <g className="teddy-runner-tail" data-part="tail">
        <path d="M82 139 C65 132 57 119 56 105" fill="none" stroke="#2a170e" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M82 139 C65 132 57 119 56 105" fill="none" stroke="#f2be6b" strokeWidth="7" strokeLinecap="round" />
        <path d="M49 77 C57 71 65 76 66 85 C76 86 81 96 74 103 C77 113 68 120 59 115 C51 123 41 118 41 109 C30 107 28 97 35 91 C31 82 39 74 49 77Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" />
        <path d="M42 94 Q50 88 56 94 M58 82 Q64 88 63 94" fill="none" stroke="#f8d995" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g transform="translate(103 151)">
        <g className="teddy-runner-leg teddy-runner-leg--rear-far" data-part="rear-far-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-11 -5 C-12 12 -15 29 -13 43 C-12 53 -5 57 3 56 C12 55 16 49 13 41 C10 27 12 10 10 -5Z" fill="#e7ad5e" />
          <path d="M-12 43 C-9 49 9 49 13 41 C19 52 12 62 0 62 C-11 62 -18 55 -12 43Z" fill="#f2be6b" />
          <path d="M-4 52 L-4 57 M4 52 L4 57" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g transform="translate(184 151)">
        <g className="teddy-runner-leg teddy-runner-leg--front-far" data-part="front-far-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-10 -6 C-11 11 -12 28 -10 43 C-9 53 -3 57 5 56 C14 55 18 49 14 41 C10 27 11 11 10 -6Z" fill="#e7ad5e" />
          <path d="M-10 43 C-7 49 11 49 15 41 C21 52 14 62 2 62 C-9 62 -16 55 -10 43Z" fill="#f2be6b" />
          <path d="M-2 52 L-2 57 M6 52 L6 57" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g className="teddy-runner-body" data-part="body">
        <path d="M78 132 C72 120 80 106 94 103 C100 91 117 89 129 97 C141 89 158 92 169 100 C184 95 200 105 203 118 C214 127 209 145 198 151 C193 164 177 169 163 164 C151 172 135 169 125 161 C109 169 91 159 89 149 C79 147 73 139 78 132Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M91 109 Q98 98 109 102 M123 99 Q136 91 147 100 M161 102 Q176 96 185 108" fill="none" stroke="#f9d995" strokeWidth="4" strokeLinecap="round" opacity=".85" />
        <path d="M88 135 Q95 127 103 133 M151 151 Q162 159 174 152" fill="none" stroke="#dfa04d" strokeWidth="3" strokeLinecap="round" opacity=".5" />
      </g>

      <g transform="translate(128 154)">
        <g className="teddy-runner-leg teddy-runner-leg--rear-near" data-part="rear-near-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-12 -6 C-12 12 -16 29 -14 44 C-13 54 -5 58 4 57 C13 56 17 50 13 42 C10 27 12 10 10 -6Z" fill="#f2be6b" />
          <path d="M-13 44 C-9 50 10 50 14 42 C20 53 13 63 1 63 C-10 63 -18 56 -13 44Z" fill="#f7cb7a" />
          <path d="M-4 53 L-4 58 M5 53 L5 58" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g transform="translate(205 154)">
        <g className="teddy-runner-leg teddy-runner-leg--front-near" data-part="front-near-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-11 -6 C-12 12 -13 29 -11 44 C-10 54 -3 58 5 57 C14 56 18 50 14 42 C11 27 12 10 10 -6Z" fill="#f2be6b" />
          <path d="M-11 44 C-7 50 11 50 15 42 C21 53 14 63 2 63 C-9 63 -17 56 -11 44Z" fill="#f7cb7a" />
          <path d="M-3 53 L-3 58 M6 53 L6 58" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g className="teddy-runner-collar" data-part="collar" stroke="#2a170e" strokeLinejoin="round">
        <path d="M181 139 Q213 153 246 137 L242 151 Q213 166 185 151Z" fill="#a24a1a" strokeWidth="3.5" />
        <path d="M185 143 Q213 157 243 142" fill="none" stroke="#f6c56f" strokeWidth="2.3" />
      </g>

      <g className="teddy-runner-head" data-part="head">
        <g className="teddy-runner-ear teddy-runner-ear--left" data-part="left-ear" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round">
          <path d="M178 71 C165 62 151 69 153 84 C143 92 148 107 159 111 C158 125 171 132 183 124 C193 119 193 101 187 91Z" fill="#e7a352" />
          <path d="M164 83 C157 88 160 101 170 108 C178 113 183 105 181 96 C178 87 171 80 164 83Z" fill="#d99042" strokeWidth="2.5" />
          <path d="M160 80 Q166 73 174 80" fill="none" stroke="#f6c879" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="teddy-runner-ear teddy-runner-ear--right" data-part="right-ear" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round">
          <path d="M250 69 C265 61 278 70 276 85 C286 95 279 109 268 112 C270 126 256 133 245 124 C235 117 237 101 243 91Z" fill="#e7a352" />
          <path d="M265 82 C273 88 269 102 259 109 C251 114 246 106 249 97 C252 88 258 79 265 82Z" fill="#d99042" strokeWidth="2.5" />
          <path d="M269 80 Q262 73 254 80" fill="none" stroke="#f6c879" strokeWidth="3" strokeLinecap="round" />
        </g>

        <path d="M213 39 C224 32 237 39 240 50 C253 48 264 57 263 70 C277 75 282 88 274 100 C283 112 276 126 264 130 C261 143 247 148 236 140 C225 151 209 148 202 139 C188 143 176 133 178 120 C164 113 164 98 174 88 C170 75 180 63 193 64 C196 50 204 42 213 39Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M194 52 C198 43 208 42 215 48 C222 41 233 44 235 54" fill="none" stroke="#f8d995" strokeWidth="4" strokeLinecap="round" />
        <g className="teddy-runner-tuft" data-part="head-tuft" stroke="#2a170e" strokeWidth="3.5">
          <path d="M194 47 C186 41 191 31 201 32 C203 21 217 20 222 30 C233 27 241 37 234 46 C228 53 205 54 194 47Z" fill="#f6c879" />
          <path d="M201 34 Q208 27 215 34 M222 32 Q230 31 232 39" fill="none" stroke="#ffe0a0" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        <path d="M189 104 C190 91 200 85 213 85 C226 85 238 92 238 105 C238 122 226 132 213 132 C200 132 188 120 189 104Z" fill="#fbe3b4" />
        <g className="teddy-runner-eyes" data-part="eyes">
          <ellipse cx="195" cy="91" rx="6" ry="8" fill="#2a170e" />
          <ellipse cx="230" cy="91" rx="6" ry="8" fill="#2a170e" />
          <circle cx="197" cy="88" r="2.2" fill="#fff" />
          <circle cx="232" cy="88" r="2.2" fill="#fff" />
        </g>
        <g className="teddy-runner-cheeks" data-part="cheeks">
          <circle cx="184" cy="110" r="7" fill="#f6ad92" opacity=".85" />
          <circle cx="242" cy="110" r="7" fill="#f6ad92" opacity=".85" />
        </g>
        <path className="teddy-runner-nose" data-part="nose" d="M205 105 Q213 100 221 105 Q220 114 213 115 Q206 114 205 105Z" fill="#2a170e" />
        <path className="teddy-runner-mouth" data-part="mouth" d="M213 115 L213 121 M213 121 Q207 127 202 121 M213 121 Q219 127 224 121" fill="none" stroke="#2a170e" strokeWidth="2.6" strokeLinecap="round" />
        <path className="teddy-runner-tongue" data-part="tongue" d="M208 125 Q213 134 218 125Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="1.8" />
      </g>

      <g className="teddy-runner-tag" data-part="heart-tag">
        <path d="M213 157 C204 147 194 157 200 165 C204 171 213 176 213 176 C213 176 224 169 226 163 C230 153 219 148 213 157Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
