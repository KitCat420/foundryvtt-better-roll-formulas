# FoundryVTT Better Roll Formulas

This module aims to enhance roll formula capabilities in Foundry VTT. It provides a set of new functions and
operators that can be used in roll formulas to make them more powerful and flexible. Users familiar with coding
languages will find many familiar constructs, such as ternaries and logic operations.


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

#### Not `!a` `not(a)`
Inverts `a` into a negated boolean value. Returns `false` if `a` is truthy, otherwise returns `true`.

### Conditionals
#### Ternary `a ? b : c` `ifThenElse(a, b, c)`
Returns `b` if `a` is truthy, otherwise returns `c`.

#### IfNull `a ?? b` `ifNull(a, b)`
Returns `b` if `a` is `null` or `undefined`, otherwise returns `a`.

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