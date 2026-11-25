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
        <g className="teddy-runner-leg teddy-runner-leg--rear-far teddy-runner-leg--diagonal-a" data-part="rear-far-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-11 -5 C-12 12 -15 29 -13 43 C-12 53 -5 57 3 56 C12 55 16 49 13 41 C10 27 12 10 10 -5Z" fill="#e7ad5e" />
          <path d="M-12 43 C-9 49 9 49 13 41 C19 52 12 62 0 62 C-11 62 -18 55 -12 43Z" fill="#f2be6b" />
          <path d="M-4 52 L-4 57 M4 52 L4 57" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g transform="translate(184 151)">
        <g className="teddy-runner-leg teddy-runner-leg--front-far teddy-runner-leg--diagonal-b" data-part="front-far-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
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
        <g className="teddy-runner-leg teddy-runner-leg--rear-near teddy-runner-leg--diagonal-b" data-part="rear-near-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          <path d="M-12 -6 C-12 12 -16 29 -14 44 C-13 54 -5 58 4 57 C13 56 17 50 13 42 C10 27 12 10 10 -6Z" fill="#f2be6b" />
          <path d="M-13 44 C-9 50 10 50 14 42 C20 53 13 63 1 63 C-10 63 -18 56 -13 44Z" fill="#f7cb7a" />
          <path d="M-4 53 L-4 58 M5 53 L5 58" fill="none" strokeWidth="2.5" />
        </g>
      </g>

      <g transform="translate(205 154)">
        <g className="teddy-runner-leg teddy-runner-leg--front-near teddy-runner-leg--diagonal-a" data-part="front-near-leg" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
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
          <path d="M178 67 C165 60 152 68 154 83 C146 91 147 107 158 116 C157 130 167 141 179 137 C190 133 193 118 187 104 C190 89 190 74 178 67Z" fill="#e7a352" />
          <path d="M166 82 C158 89 159 103 168 113 C175 121 182 117 182 108 C182 97 176 85 166 82Z" fill="#d99042" strokeWidth="2.5" />
          <path d="M160 80 Q166 73 174 80" fill="none" stroke="#f6c879" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className="teddy-runner-ear teddy-runner-ear--right" data-part="right-ear" stroke="#2a170e" strokeWidth="4" strokeLinejoin="round">
          <path d="M251 67 C265 60 278 68 276 83 C284 91 283 107 272 116 C273 130 263 141 251 137 C240 133 237 118 243 104 C240 89 239 74 251 67Z" fill="#e7a352" />
          <path d="M263 82 C273 89 272 103 263 113 C256 121 248 117 248 108 C248 97 253 85 263 82Z" fill="#d99042" strokeWidth="2.5" />
          <path d="M270 80 Q263 73 255 80" fill="none" stroke="#f6c879" strokeWidth="3" strokeLinecap="round" />
        </g>

        <path data-part="head-shape" d="M212 39 C226 34 241 39 249 52 C262 55 273 67 272 82 C282 93 280 109 270 120 C270 134 257 145 242 142 C231 152 214 152 201 145 C187 148 173 139 170 126 C158 117 158 101 165 89 C162 75 173 63 187 60 C192 46 201 39 212 39Z" fill="#f2be6b" stroke="#2a170e" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M194 51 C199 45 207 43 215 48 C222 43 230 45 234 52" fill="none" stroke="#f8d995" strokeWidth="4" strokeLinecap="round" />
        <g className="teddy-runner-tuft" data-part="head-tuft" stroke="#2a170e" strokeWidth="3.2" strokeLinejoin="round">
          <path d="M198 47 C191 42 194 34 202 34 C206 27 216 27 220 34 C228 32 234 38 231 45 C224 51 207 52 198 47Z" fill="#f6c879" />
          <path d="M201 36 Q208 31 214 37 M219 35 Q225 34 228 40" fill="none" stroke="#ffe0a0" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        <path data-part="face-blaze" d="M208 64 C214 62 219 66 222 73 C224 81 220 91 213 101 C206 91 202 81 204 73 C205 68 206 66 208 64Z" fill="#fbe3b4" />
        <path d="M190 79 Q198 75 205 79 M222 79 Q230 75 237 79" fill="none" stroke="#9a6338" strokeWidth="2.8" strokeLinecap="round" />
        <g className="teddy-runner-eyes" data-part="eyes">
          <ellipse cx="198" cy="88" rx="5.8" ry="8" fill="#2a170e" />
          <ellipse cx="230" cy="88" rx="5.8" ry="8" fill="#2a170e" />
          <circle cx="200" cy="85" r="2.2" fill="#fff" />
          <circle cx="232" cy="85" r="2.2" fill="#fff" />
        </g>
        <g className="teddy-runner-cheeks" data-part="cheeks">
          <circle cx="181" cy="113" r="6.5" fill="#f6ad92" opacity=".82" />
          <circle cx="245" cy="113" r="6.5" fill="#f6ad92" opacity=".82" />
        </g>

        <g className="teddy-runner-muzzle" data-part="muzzle">
          <path d="M188 106 C192 97 202 95 213 101 C224 95 235 98 238 107 C242 119 230 132 213 134 C196 132 185 119 188 106Z" fill="#fbe3b4" />
          <path d="M192 112 C196 104 207 104 213 112 C214 120 208 127 200 126 C193 126 189 119 192 112Z" fill="#fff2d8" />
          <path d="M213 112 C219 104 230 104 234 112 C237 119 232 126 225 126 C217 127 211 120 213 112Z" fill="#fff2d8" />
          <g className="teddy-runner-whisker-spots" fill="#9a7550" opacity=".78">
            <circle cx="198" cy="116" r="1.5" />
            <circle cx="203" cy="120" r="1.4" />
            <circle cx="207" cy="116" r="1.2" />
            <circle cx="219" cy="116" r="1.2" />
            <circle cx="223" cy="120" r="1.4" />
            <circle cx="228" cy="116" r="1.5" />
          </g>
        </g>
        <path className="teddy-runner-nose" data-part="nose" d="M204 101 Q213 94 222 101 Q222 108 213 112 Q204 108 204 101Z" fill="#2a170e" />
        <path d="M208 100 Q213 97 217 100" fill="none" stroke="#8e776c" strokeWidth="1.7" strokeLinecap="round" />
        <path className="teddy-runner-mouth" data-part="mouth" d="M213 111 V118 M213 118 Q207 125 201 121 M213 118 Q219 125 225 121" fill="none" stroke="#2a170e" strokeWidth="2.8" strokeLinecap="round" />
        <path className="teddy-runner-tongue" data-part="tongue" d="M208 125 Q213 133 218 125 Q217 134 213 134 Q209 134 208 125Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="1.8" strokeLinejoin="round" />
      </g>

      <g className="teddy-runner-tag" data-part="heart-tag">
        <path d="M213 157 C204 147 194 157 200 165 C204 171 213 176 213 176 C213 176 224 169 226 163 C230 153 219 148 213 157Z" fill="#fbe3b4" stroke="#2a170e" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
