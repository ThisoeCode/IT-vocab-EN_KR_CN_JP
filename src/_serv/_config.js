export const tableConfig = {
  /** Table Header Cells */
  th: [
    '단어',
    '한자',
    '뜻',
    '例',
    '사전',
    '🗑️' // '&#128465;'
  ],
}

/** DB format */
export const convertConfig = {
  'id'  : null,
//  db  : tableHeader (falsy to disable pass to frontend)
 'word' : '단어',
'hanja' : '한자',
 'mean' : '뜻',
 'link' : '사전',
 'memo' : '例',
  'createdtime' : 'time',

// Planned
'check' : null,

}