export default function TeddyRunner() {
  return (
    <svg
      className="teddy-runner-svg"
      data-testid="teddy-runner-svg"
      viewBox="0 0 220 160"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="111" cy="145" rx="76" ry="6" fill="#4b2b17" opacity=".13" />

      <g className="teddy-runner-tail">
        <path d="M49 85 C31 81 27 69 30 57" fill="none" stroke="#2a170e" strokeWidth="10" strokeLinecap="round" />
        <path d="M49 85 C31 81 27 69 30 57" fill="none" stroke="#e7a653" strokeWidth="5.5" strokeLinecap="round" />
        <path d="M30 35 Q38 29 43 38 Q54 38 51 49 Q58 58 47 63 Q46 75 34 70 Q24 78 19 67 Q7 69 10 57 Q1 49 12 42 Q14 30 24 35 Q27 26 30 35Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
      </g>

      <g className="teddy-runner-leg teddy-runner-leg--rear-far">
        <path d="M68 96 C65 108 57 120 59 132 Q61 139 72 138 L84 136 Q89 133 83 126 L91 101Z"
          fill="#e4a352" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M59 132 Q67 127 82 132 L85 138 Q81 144 66 142 Q56 142 59 132Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M67 135 L68 139 M75 135 L76 139" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="teddy-runner-leg teddy-runner-leg--front-far">
        <path d="M139 96 Q151 108 149 123 L153 133 Q154 139 165 138 L177 135 Q181 131 173 124 L167 96Z"
          fill="#e4a352" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M152 132 Q163 127 176 132 L180 138 Q177 144 162 143 Q150 143 152 132Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M162 135 L163 139 M170 135 L171 139" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="teddy-runner-body">
        <path d="M43 91 Q36 83 44 75 Q44 64 58 63 Q65 53 80 58 Q91 52 105 59 Q119 54 130 63 Q146 63 150 75 Q162 82 154 92 Q158 104 144 109 Q135 119 119 114 Q106 121 93 115 Q79 121 67 112 Q52 115 48 105 Q38 103 43 91Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.7" strokeLinejoin="round" />
        <path d="M62 103 Q76 111 91 108 Q108 116 124 108 Q140 111 147 98"
          fill="none" stroke="#f8d995" strokeWidth="3" strokeLinecap="round" opacity=".7" />
      </g>

      <g className="teddy-runner-leg teddy-runner-leg--rear-near">
        <path d="M77 101 Q83 111 78 124 L74 132 Q71 139 83 140 L96 138 Q102 134 95 127 L101 101Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M74 132 Q85 127 97 132 L100 139 Q96 145 82 144 Q70 144 74 132Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M83 135 L84 140 M91 135 L92 140" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="teddy-runner-leg teddy-runner-leg--front-near">
        <path d="M131 101 Q139 110 136 124 L132 132 Q129 139 141 140 L154 137 Q160 133 153 126 L158 99Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M132 132 Q144 127 156 132 L159 139 Q155 145 141 144 Q129 144 132 132Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M141 135 L142 140 M149 135 L150 140" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
      </g>

      <g className="teddy-runner-head">
        <path d="M129 65 Q113 64 112 81 Q105 94 119 104 Q124 116 139 110 Q147 121 159 111 Q177 118 185 102 Q199 94 190 79 Q194 62 178 56 Q170 42 154 49 Q140 39 132 53 Q119 51 129 65Z"
          fill="#e4a352" stroke="#2a170e" strokeWidth="3.8" strokeLinejoin="round" />
        <path d="M164 60 Q174 49 183 60 Q197 59 197 74 Q205 85 195 96 Q194 110 181 111 Q174 120 164 108Z"
          fill="#e4a352" stroke="#2a170e" strokeWidth="3.8" strokeLinejoin="round" />
        <path d="M145 54 Q141 42 151 39 Q153 27 165 32 Q177 27 181 39 Q193 43 187 54 Q189 63 177 63 Q164 69 155 61 Q144 64 145 54Z"
          fill="#f2be6b" stroke="#2a170e" strokeWidth="3.3" strokeLinejoin="round" />
        <path d="M145 86 Q140 72 150 65 Q161 56 175 64 Q188 71 184 87 Q183 104 165 107 Q148 106 145 86Z"
          fill="#fbe3b4" />
        <ellipse cx="151" cy="78" rx="4.2" ry="5.3" fill="#2a170e" />
        <ellipse cx="177" cy="78" rx="4.2" ry="5.3" fill="#2a170e" />
        <circle cx="152.2" cy="76.2" r="1.35" fill="#fff" />
        <circle cx="178.2" cy="76.2" r="1.35" fill="#fff" />
        <circle cx="143" cy="91" r="6.2" fill="#f5b69a" opacity=".9" />
        <circle cx="186" cy="91" r="6.2" fill="#f5b69a" opacity=".9" />
        <path d="M158 88 Q164 83 170 88 Q169 95 164 96 Q159 94 158 88Z" fill="#2a170e" />
        <path d="M164 96 V100 M164 100 Q159 105 155 101 M164 100 Q169 105 173 101"
          fill="none" stroke="#2a170e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M161 102 Q164 108 167 102Z" fill="#e98c8c" stroke="#2a170e" strokeWidth="1.5" />
      </g>

      <path d="M126 111 Q144 121 164 111 L162 119 Q145 130 128 119Z"
        fill="#a24a1a" stroke="#2a170e" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M145 121 Q140 117 137 122 Q137 128 145 132 Q153 128 153 122 Q150 117 145 121Z"
        fill="#fbe3b4" stroke="#2a170e" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
