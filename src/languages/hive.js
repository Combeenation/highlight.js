/*
Language: Hive (Combeenation)
Author: Martin Enzelsberger <martin.enzelsberger@combeenation.com>
Description: Hive is the rule language used to build Combeenation configurators
*/

function(hljs) {
  var HIVE_IDENT = hljs.UNDERSCORE_IDENT_RE;
  var KEYWORDS = {
    keyword:
      // Normal keywords.
      '@top and as elif else end if is mod not or then',
    literal:
      'false true empty',
    symbol:
      'configuration configurator presets'
  };

  var SUBST = {
    className: 'subst',
    begin: '{=', end: '}',
    keywords: KEYWORDS,
    contains: []  // defined later
  };
   var FORMATTED_TEXT = {
    className: 'string',
    begin: '"""', end: '"""',
    contains: [ SUBST ]
  };
  var STRING = {
    variants: [
      FORMATTED_TEXT,
      hljs.QUOTE_STRING_MODE
    ]
  };
  var RECORD = {
    begin: '{', end: '}',
    keywords: KEYWORDS,
    contains: [] // defined later
  };
  SUBST.contains = [
    FORMATTED_TEXT,
    hljs.QUOTE_STRING_MODE,
    hljs.C_LINE_COMMENT_MODE,
    hljs.C_BLOCK_COMMENT_MODE,
    hljs.C_NUMBER_MODE,
    RECORD
  ];
  RECORD.contains = [
    {
      className: 'title',
      begin: HIVE_IDENT + '\\s*(:|=)'
    }
  ].concat(SUBST.contains);

  return {
    aliases: ['cbnhive'],
    case_insensitive: true,
    keywords: KEYWORDS,
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      STRING,
      hljs.C_NUMBER_MODE,
      RECORD
    ]
  };
}
