export const tableConfig = {
  /** Table Header Cells */
  th: [
    'English',
    '한국어',
    '(한2)',
    '中文',
    '(中2)',
    '日本語',
    'Wiki',
    // 'Category',
    'Memo',
    '🗑️' // '&#128465;'
  ],
}

/** DB format */
export const convertConfig = {
  'id'  : null,
//  db  : tableHeader (falsy to disable pass to frontend)
  '_en' : 'English',
  '_ko' : '한국어',
  '_zh' : '中文',
  '_ja' : '日本語',
 '_ko2' : '(한2)',
 '_zh2' : '(中2)',
 'wiki' : 'Wiki',
  'cat' : 'Category',
 'memo' : 'Memo',
  'createdtime' : 'time',

// Planned
'check' : null,

}