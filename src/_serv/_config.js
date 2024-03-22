export const tableConfig = {
  /** Table Header Cells */
  th: [
    '분류',
    '한국어',
    '(한2)',
    '中文',
    '(中2)',
    'English',
    '(English 2)',
    '日本語',
    '(日2)',
    'Wiki',
    // 'Category',
    '🗑️' // '&#128465;'
  ],
}

/** DB format */
export const convertConfig = {
  'id'  : null,
//  db  : tableHeader (falsy to disable pass to frontend)
   'cat': '분류',
  '_en' : 'English',
  '_ko' : '한국어',
  '_zh' : '中文',
  '_ja' : '日本語',
 '_en2' : '(English 2)',
 '_ko2' : '(한2)',
 '_zh2' : '(中2)',
 '_ja2' : '(日2)',
 'wiki' : 'Wiki',
  'createdtime' : 'time',

// Planned
'check' : null,

}