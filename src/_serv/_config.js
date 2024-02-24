export const tableConfig = {
  th: [
    'English',
    '한국어',
    '中文',
    '日本語',
    'Wiki',
    // 'Category',
    'Memo',
    '🗑️' // '&#128465;'
  ],
  val: ['en','ko','zh','ja','wiki','categ','memo']
}

/** DB format */
export const convertConfig = {

// DtBs : tableHeader (falsy to disable pass to frontend)
  '_en' : 'English',
  '_ko' : '한국어',
  '_zh' : '中文',
  '_ja' : '日本語',
 'wiki' : 'Wiki',
  'cat' : 'Category',
 'memo' : 'Memo',
  'createtime' : 'time',

// NOT YET AVAILABLE
'check' : null,

}