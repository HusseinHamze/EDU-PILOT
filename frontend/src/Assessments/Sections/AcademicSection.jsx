import React, { Suspense, lazy } from 'react';

const Range = lazy(() => import('../Questions-Format/Range'));
const MultiChoice = lazy(() => import('../Questions-Format/MultiChoice'));
const TrueFalse = lazy(() => import('../Questions-Format/TrueFalse'));

export default function AcademicSection() {
    return (
        <Suspense fallback={<div>Loading academic section...</div>}>
            <Range />
            <MultiChoice />
            <TrueFalse />
        </Suspense>
    );
}
