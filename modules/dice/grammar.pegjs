{{
  const funcMap = {
    /* Math */
    "**": "pow",
    "%": "mod",

    /* Logic */
    "||": "or",
    "&&": "and",
    "!": "not",

    /* Comparison */
    "=": "eq",
    "==": "eq",
    "===": "eq",
    "!=": "neq",
    "!==": "neq",
    "<": "lt",
    ">": "gt",
    "<=": "lte",
    ">=": "gte",

    /* Bitwise Operations */
    "~": "bitFlip",
    "|": "bitOr",
    "^": "bitXOr",
    "&": "bitAnd",
    "<<": "leftShift",
    ">>": "rightShift",
    ">>>": "unsignedRightShift",

    /* Other */
    "??": "ifNull",
    "ternaryOp": "ifThenElse",
    "?:": "or"
  }
}}

Term = Ternary / ComparisonOperation / DicePool / Roll / FlavoredFunction / FlavoredNumber / FlavoredParenthetical / String

/* === Ternary Production Rules === */
Ternary = _ ifCase:TernaryFirst _ "?" _ thenCase:Term _ ":" _ elseCase:Term {
   return funcMap["ternaryOp"] + "(" + [ifCase, thenCase, elseCase].join(", ") + ")";
}
TernaryFirst = ComparisonOperation / DicePool / Roll / FlavoredFunction / FlavoredNumber / FlavoredParenthetical

/* === Dice Roll Production Rules === */
DicePool = "{" _ first:Term tail:ExtraArgs* _ "}" mod:Modifier? flavor:flavor? {
  return "{" + tail.reduce((result, element) => {
    return result + ", " + element[3];
  }, first) + "}" + (mod || "") + (flavor || "")
}

Roll = DiceRoll / FunctionRoll

DiceRoll = left:RollTermHand "d" right:RightRollTermHand mod:Modifier? flavor:flavor? {
  return left + "d" + right + (mod || "") + (flavor || "")
}

FunctionRoll = _ sign:Sign? _ func:Function "d" right:RightRollTermHand mod:Modifier? flavor:flavor? {
  return (sign || "") + "(" + func + ")d" + right + (mod || "") + (flavor || "")
}

RightRollTermHand = RollTermHand / [a-z]
RollTermHand = NestedParenthetical / Numerical

/* === Math and Logic Operation Production Rules === */
ComparisonOperation = _ head:Operation _ tail:($("&"|1..2| / "|"|1..2| / "??" / "?:") _ Operation _)* {
  return tail.reduce((result, element) => {
    const func = funcMap[element[0]] || null;
      return func
        ? func + "("+ result + ", " + element[2] + ")"
        : result.trim() + " " + element[0] + " " + element[2];
  }, head);
}
/ PrefixOperation

Operation = _ head:OperationTerm _ tail:(mathLogicOp _ OperationTerm _)* {
  return tail.reduce((result, element) => {
    const func = funcMap[element[0]] || null;
      return func
        ? func + "("+ result + ", " + element[2] + ")"
        : result.trim() + " " + element[0] + " " + element[2];
  }, head);
}
/ PrefixOperation

OperationTerm = PrefixOperation / DicePool / Roll / FlavoredNumber / FlavoredFunction / FlavoredParenthetical / String

PrefixOperation = _ prefixOp:prefixOp _ term:Term _ {
  return funcMap[prefixOp] + "(" + term + ")"
}

/* === Parentheticals === */
FlavoredParenthetical = sign:Sign? _ term:NestedParenthetical flavor:flavor? {
  return (sign || "") + term + (flavor || "");
}

NestedParenthetical = sign:Sign? _ "(" _ term:(NestedParenthetical / Parenthetical) _ ")" {
  return (sign || "") + term;
} / Parenthetical

Parenthetical = sign:Sign? _ "(" _ term:Term _ ")" {
  return (sign || "") + "(" + term + ")"
}

/* === Function Production Rules === */
FlavoredFunction = func:Function flavor:flavor? {
  return func + (flavor || "");
}

Function = _ sign:Sign? _ func:functionName "(" _ head:Term? tail:ExtraArgs* _ ")" {
  return (sign || "") + func + "(" + tail.reduce((result, element) => {
    return result + ", " + element[3]
  }, head || "") + ")"
}

ExtraArgs = _ "," _ Term _

/* === Numbers, Strings and Variable Production Rules === */
FlavoredNumber = _ term:NumberOrVariable flavor:flavor? ![0-9a-z._] {
	return term + (flavor || "");
}

NumberOrVariable = Number / Variable

Number = _ sign:Sign _ tail:Numerical {
  return sign + tail
}

Variable = _ sign:Sign _ tail:variable {
  return sign + tail
}

Modifier = mod:modifier _ tail:Parenthetical? {
  return mod + (tail || "");
}

Sign = signs:(@sign _)* {
  return signs.filter(sign => sign.trim() === "-").length % 2 ? "-" : "";
}

Numerical = numerical / partialNumerical

String = !"@" term:(replacedData / plainString) flavor:flavor? {
	return term + (flavor || "");
}

/* === Terminals === */
replacedData = $("$" $[^$]+ "$")
plainString = $(!"@" [^ (){}[\]$,+\-*%/<>=?:]+)

sign "Sign" = $([-+] _)
modifier "Roll Modifier" = $([^ (){}[\]$+\-*/,]+)
flavor "Roll Flavor" = $("[" [^[\]]* "]")
functionName "Function Name" = $([a-z_]i[a-z0-9_]i*)
numerical = $([0-9]+ ("." [0-9]+)?)
partialNumerical = "." num:$[0-9]+ {
  return "0." + num;
}
variable "Variable" = $("@" [a-z_]i [0-9a-z._]i* ("-" [a-z_.]i [0-9a-z._]i*)*)

/* Prefix operators */
prefixOp = "!" / "~"

/* Math & logic operators in order of precedence */
mathLogicOp = $("*"|1..2|) / "/" / "%" / "+" / "-"
/ $([<>] "="?)
/ $("="|1..3|) / $("!" "="|1..2|)
/ "^" / "<<" / $(">"|2..3|)

_ "Whitespace" = [ ]*