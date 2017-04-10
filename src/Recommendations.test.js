import React from "react";
import Recommendations from "./Recommendations";
import {TYPES} from "./App";

const items = [
    {"title": "1", "sections": ["EVOLUTION OF THE GLYPH", "IN RELIGION", "IN MATHEMATICS"]},
    {"title": "27_(number)", "sections": ["EVOLUTION OF THE GLYPH", "IN RELIGION", "IN TECHNOLOGY"]},
    {"title": "Arithmetic", "sections": ["EDUCATIONAL STANDARDS", "TEACHING METHODS", "MULTIPLICATION", "COUNTING", "FOOTNOTES", "UNIVERSITY LEVEL", "DIVISION", "TOOLS", "ADDITION", "NEW DIRECTIONS"]},
    {"title": "10", "sections": ["EVOLUTION OF THE GLYPH", "IN RELIGION", "IN SPORTS"]},
    {"title": "Number", "sections": ["QUEENS CONSORT", "201 TO 300", "FOOTNOTES", "601 TO 700", "801 TO 900", "DEFINITION", "PRETENDERS", "LIMITATIONS", "701 TO 800", "501 TO 600", "INTRODUCTION", "FORMAL DEFINITIONS"]},
    {"title": "24_(number)", "sections": ["EVOLUTION OF THE GLYPH", "IN TECHNOLOGY"]},
    {"title": "0", "sections": ["FEATURES", "SYMBOLISM", "INNOVATIONS", "DISCOVERIES", "IN RELIGION", "CONSTRUCTION", "IN OTHER FIELDS", "DEPLOYMENT", "MODERN DEVELOPMENT", "DESCRIPTION AND HISTORY", "NAMES AND ETYMOLOGY", "COMBINATIONS"]},
    {"title": "9", "sections": ["IN SCIENCE", "IN OTHER FIELDS", "IN TECHNOLOGY", "IN MATHEMATICS", "IN RELIGION", "IN SPORTS"]},
    {"title": "Coprime_integers", "sections": ["RELATED AREAS", "MAJOR RESULTS", "BASIC NOTIONS"]},
    {"title": "Numerical_digit", "sections": ["CHARACTERS", "LEGAL HISTORY", "USAGE", "NOTATIONS", "ORIGIN", "EARLY HISTORY", "OPERATIONS", "OTHER BASES", "DEFINITION", "CLUSTERING", "SYMBOLS", "BIBLIOGRAPHY"]},
    {"title": "Exponentiation", "sections": ["FORMAL DEFINITION", "OTHER EXAMPLES", "MEANING", "EQUATIONS", "ALTERNATIVE NOTATIONS", "DEFINITION", "TYPOGRAPHY", "BIBLIOGRAPHY", "AXIOMS", "COMPUTATION", "CATEGORICAL DESCRIPTION", "CONSTRUCTION"]},
    {"title": "Senary", "sections": ["CONVERSION", "ORIGIN", "USAGE", "ISSUES", "GENETICS", "REPRESENTATION", "HISTORY", "EXAMPLES", "DATA TRANSMISSION", "APPLICATIONS", "PLACES", "MATHEMATICS"]},
    {"title": "33_(number)", "sections": ["EVOLUTION OF THE GLYPH"]},
    {"title": "Parity_(mathematics)", "sections": ["DEFINITIONS", "FORMAL DEFINITION", "CATEGORY THEORY", "SETS", "TYPE THEORY", "FOOTNOTES", "ALTERNATIVE NOTATIONS", "DEFINITION", "TYPOGRAPHY", "PROPERTY", "IN PHYSICS", "EXAMPLE"]},
    {"title": "Modular_multiplicative_inverse", "sections": ["FORMAL DEFINITION", "OTHER EXAMPLES", "MEANING", "EQUATIONS", "ALTERNATIVE NOTATIONS", "DEFINITION", "TYPOGRAPHY", "BIBLIOGRAPHY", "AXIOMS", "CATEGORICAL DESCRIPTION", "CONSTRUCTION", "HISTORICAL DEVELOPMENTS"]},
    {"title": "37_(number)", "sections": ["EVOLUTION OF THE GLYPH", "IN RELIGION", "IN TECHNOLOGY"]},
    {"title": "14_(number)", "sections": ["EVOLUTION OF THE GLYPH", "IN RELIGION", "IN TECHNOLOGY"]},
    {"title": "Montgomery_modular_multiplication", "sections": ["DESCRIPTION OF THE CIPHER", "DEFINITION", "INTRODUCTION", "IMPLEMENTATIONS", "METHOD OF OPERATION", "PROPOSED USES", "MOTIVATION", "BACKGROUND", "EFFICIENCY", "BASIC DEFINITIONS", "TOKENS", "SECURITY"]}
];

const ReactTestRenderer = require('react-test-renderer');

it('renders in the correct order', () => {
    const component = ReactTestRenderer.create(
        <Recommendations
            type={TYPES.missing_sections}
            source="en"
            showPreview={() => undefined}
            items={items}
        />
    );

    let tree = component.toJSON();

    for(let i=0; i<items.length; i++) {
        const expected = items[i].title.replace(/_/g, ' ');
        const actualTitle = tree.children[i].children[1].children[0].children[0].children[0];
        expect(actualTitle).toEqual(expected);
    }
});
