# FoundryVTT Better Roll Formulas

This module aims to enhance roll formula capabilities in Foundry VTT. It provides a set of new functions and
operators that can be used in roll formulas to make them more powerful and flexible, as well as new dice
modifiers. Users familiar with coding  languages will find many familiar constructs, such as ternaries and logic operations.

## List of new dice modifiers

### Explode Compound `<quantity>d<faces>xc<operator><target>`

**Examples**
- `2d6xc=6` - Explode all dice rolls of 6 and sum their results.
- `2d6xc<=3` - Explode all dice rolls below or equal to 3 and sum their results.
- `2d6xc<3` - Explode all dice rolls below 3 and sum their results.
- `2d6xc>=3` - Explode all dice rolls above or equal to 3 and sum their results.
- `2d6xc>3` - Explode all dice rolls above 3 and sum their results.

Explode all dice rolls that match the target and sum their results.

### Explode Recursive Compound `<quantity>d<faces>xrc<operator><target>`

**Examples**
- `2d6xrc=6` - Explode all dice rolls of 6 and sum their results, re-rolling the dice.
- `2d6xrc<=3` - Explode all dice rolls below or equal to 3 and sum their results, re-rolling the dice.
- `2d6xrc<3` - Explode all dice rolls below 3 and sum their results, re-rolling the dice.
- `2d6xrc>=3` - Explode all dice rolls above or equal to 3 and sum their results, re-rolling the dice.
- `2d6xrc>3` - Explode all dice rolls above 3 and sum their results, re-rolling the dice.

Explode all dice rolls that match the target and sum their results.
Unlike Explode Compound, which only reroll the die once, recusive reroll will keep rolling as long
as results meet the target.

### Explode Penetrating `<quantity>d<faces>xp<operator><target>`

**Examples**
- `2d6xp=6` - Explode all dice rolls of 6, subtracting 1 from the newly rolled dice result.
- `2d6xp<=3` - Explode all dice rolls below or equal to 3, subtracting 1 from the newly rolled dice result.
- `2d6xp<3` - Explode all dice rolls below 3, subtracting 1 from the newly rolled dice result.
- `2d6xp>=3` - Explode all dice rolls above or equal to 3, subtracting 1 from the newly rolled dice result.
- `2d6xp>3` - Explode all dice rolls above 3, subtracting 1 from the newly rolled dice result.

Explode all dice rolls that match the target, reducing the value of the extra rolled dice by 1.

### Explode Recursive Penetrating `<quantity>d<faces>xrp<operator><target>`

**Examples**
- `2d6xrp=6` - Explode all dice rolls of 6, subtracting 1 from the newly rolled dice result and re-rolling the dice.
- `2d6xrp<=3` - Explode all dice rolls below or equal to 3, subtracting 1 from the newly rolled dice result and re-rolling the dice.
- `2d6xrp<3` - Explode all dice rolls below 3, subtracting 1 from the newly rolled dice result and re-rolling the dice.
- `2d6xrp>=3` - Explode all dice rolls above or equal to 3, subtracting 1 from the newly rolled dice result and re-rolling the dice.
- `2d6xrp>3` - Explode all dice rolls above 3, subtracting 1 from the newly rolled dice result and re-rolling the dice.

Explode all dice rolls that match the target, reducing the value of the extra rolled dice by 1.
Unlike Explode Penetrating, which only reroll the die once, recusive reroll will keep rolling as long
as results meet the target.

### Maximize `<quantity>d<faces>mx<operator><target>`

**Examples**
- `2d6mx=1` - Maximize all dice rolls of 1.
- `2d6mx<=3` - Maximize all dice rolls below or equal to 3.
- `2d6mx<3` - Maximize all dice rolls below 3.
- `2d6mx>=3` - Maximize all dice rolls above or equal to 3.
- `2d6mx>3` - Maximize all dice rolls above 3.

Artificially maximize all dice rolls that match the target to the maximum possible value.

### Minimize `<quantity>d<faces>mn<operator><target>`

**Examples**
- `2d6mn=6` - Minimize all dice rolls of 6.
- `2d6mn>=3` - Minimize all dice rolls above or equal to 3.
- `2d6mn>3` - Minimize all dice rolls above 3.
- `2d6mn<=3` - Minimize all dice rolls below or equal to 3.
- `2d6mn<3` - Minimize all dice rolls below 3.

Artificially minimize all dice rolls that match the target to the minimum possible value.

### Set `<quantity>d<faces>set<value><operator><target>`

**Examples**
- `2d6set1=3` - Set all dice rolls of 3 to 1.
- `2d6set1<=3` - Set all dice rolls below or equal to 3 to 1.
- `2d6set3<3` - Set all dice rolls below 3 to 3.
- `2d6set4>=3` - Set all dice rolls above or equal to 3 to 4.
- `2d6set5>3` - Set all dice rolls above 3 to 5.

Artificially set all dice rolls that match the target to the provided value.

### Sort `<quantity>d<faces>s<order>`

**Examples**
- `2d6s` - Sort all dice rolls in ascending order.
- `2d6sa` - Sort all dice rolls in ascending order.
- `2d6sd` - Sort all dice rolls in descending order.

Sort all dice rolls in either ascending or descending order based on their result.

### Unique `<quantity>d<faces>u`

**Examples**
- `2d6u` - Roll 2d6 and keep only unique results.

Re-roll all dice results that are duplicate of previous results, keeping only unique values.
If more dice are rolled than faces are available, re-roll dices from left to right until all
values have been encountered at least once.

## List of available functions

### Math Functions

#### Exponential `a ** b` `exp(a, b)` `pow(a, b)`
Exponential term of the form `aᵇ`.

#### Modulo `a % b` `mod(a, b)`
Remainder of the division of `a` by `b`.

### Logic Functions

#### And `a && b` `and(a, b)`
Returns `b` if both `a` and `b` are truthy.

#### Or `a || b` `a ?: b` `or(a, b)`
Returns `a`, if `a` is truthy, otherwise returns `b`.
#### Xor `xor(a, b[, ...])`
Returns first truthy argument if only one argument is truthy, otherwise `0`, otherwise returns `false`.

#### Not `!a` `not(a)`
Inverts `a` into a negated boolean value. Returns `false` if `a` is truthy, otherwise returns `true`.

#### Odd `odd(a)`
Returns `true` if `a` is an odd number, otherwise returns `false`.

#### Even `even(a)`
Returns `true` if `a` is an even number, otherwise returns `false`.

### Conditionals
#### Ternary `a ? b : c` `ifThenElse(a, b, c)`
Returns `b` if `a` is truthy, otherwise returns `c`.

#### IfNull `a ?? b` `ifNull(a, b)`
Returns `b` if `a` is `null` or `undefined`, otherwise returns `a`.

#### If `if(a, b)`
Returns `b` if `a` is truthy, otherwise returns `0`.

### Comparison Operators
#### Equal `a = b` `a == b` `a === b` `eq(a, b)`
Returns `true` if `a` is equal to `b`, otherwise returns `false`.

#### Not Equal `a != b` `a !== b` `neq(a, b)`
Returns `true` if `a` is not equal to `b`, otherwise returns `false`.

#### Greater Than `a > b` `gt(a, b)`
Returns `true` if `a` is greater than `b`, otherwise returns `false`.

#### Greater Than or Equal `a >= b` `gte(a, b)`
Returns `true` if `a` is greater than or equal to `b`, otherwise returns `false`.

#### Less Than `a < b` `lt(a, b)`
Returns `true` if `a` is less than `b`, otherwise returns `false`.

#### Less Than or Equal `a <= b` `lte(a, b)`
Returns `true` if `a` is less than or equal to `b`, otherwise returns `false`.

### Bitwise Operators
#### Bitwise And `a & b` `bitAnd(a, b)`
Bitwise AND operation between `a` and `b`.

#### Bitwise Or `a | b` `bitOr(a, b)`
Bitwise OR operation between `a` and `b`.

#### Bitwise Xor `a ^ b` `bitXor(a, b)`
Bitwise XOR operation between `a` and `b`.

#### Bitwise Not `~a` `bitFlip(a)`
Bitwise NOT operation on `a`.

#### Bitwise Left Shift `a << b` `leftShift(a, b)`
Bitwise left shift operation on `a` by `b` bits.

#### Bitwise Right Shift `a >> b` `rightShift(a, b)`
Bitwise right shift operation on `a` by `b` bits.

#### Bitwise Unsigned Right Shift `a >>> b` `unsignedBitShift(a, b)`
Bitwise zero-fill right shift operation on `a` by `b` bits.

### Utility Functions

#### Lookup `lookup(index, fallback, a, b, ...)`
Returns the value at position `index`, or `fallback` if `index` is out of bounds.

#### Between `between(value, min, max)`
Returns `true`, if the provided `value` lies between `min` and `max` (exclusive).