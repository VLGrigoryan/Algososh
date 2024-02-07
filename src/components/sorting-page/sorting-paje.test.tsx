import { getSortingSteps } from './../../utils'; 
import { ElementStates, SortingMethod, Direction } from './../../types';

describe("Sorting Algorithms", () => {
    it("Correctly sorts an empty array with bubble method", () => {
        const emptyBubbleArr = getSortingSteps([], SortingMethod.Bubble, Direction.Ascending);
        expect(emptyBubbleArr).toEqual([]);
    });

    it("Correctly sorts an single array with bubble method", () => {
        const singleBubbleArr = getSortingSteps(
            [{ value: 43, state: ElementStates.Default }],
            SortingMethod.Selection,
            Direction.Descending
        );
        expect(singleBubbleArr[singleBubbleArr.length - 1]).toEqual([{ value: 43, state: ElementStates.Modified }]);
    });

    it("Correctly sorts an multiple array with bubble method", () => {
        const multipleBubbleArr = getSortingSteps(
            [
                { value: 37, state: ElementStates.Default },
                { value: 57, state: ElementStates.Default },
                { value: 17, state: ElementStates.Default },
            ],
            SortingMethod.Selection,
            Direction.Ascending
        );
        expect(multipleBubbleArr[multipleBubbleArr.length - 1]).toEqual([
            { value: 17, state: ElementStates.Modified },
            { value: 37, state: ElementStates.Modified },
            { value: 57, state: ElementStates.Modified },
        ]);

    });

    it("Correctly sorts an empty array with Selection method", () => {
        const emptySelectionArr = getSortingSteps([], SortingMethod.Selection, Direction.Ascending);
        expect(emptySelectionArr).toEqual([]);
    });

    it("Correctly sorts an single array with Selection method", () => {
        const singleSelectionArr = getSortingSteps(
            [{ value: 23, state: ElementStates.Default }],
            SortingMethod.Selection,
            Direction.Descending
        );
        expect(singleSelectionArr[singleSelectionArr.length - 1]).toEqual([{ value: 23, state: ElementStates.Modified }]);
    });

    it("Correctly sorts an multiple array with Selection method", () => {
        const multipleSelectionArr = getSortingSteps(
            [
                { value: 37, state: ElementStates.Default },
                { value: 57, state: ElementStates.Default },
                { value: 17, state: ElementStates.Default },
            ],
            SortingMethod.Selection,
            Direction.Descending
        );
        expect(multipleSelectionArr[multipleSelectionArr.length - 1]).toEqual([
            { value: 57, state: ElementStates.Modified },
            { value: 37, state: ElementStates.Modified },
            { value: 17, state: ElementStates.Modified },
        ]);
    });
});