package validateinputs

import (
	"fmt"

	"github.com/sethvargo/go-githubactions"
)

func (i Inputs) or(or [][]string) error {
	if len(or) == 0 {
		return nil
	}

	githubactions.Debugf("Inputs that are mutually exclusive:")
	for _, mututallyExclusiveInputs := range or {
		githubactions.Debugf("\t%v", mututallyExclusiveInputs)
	}

	counts := i.orCounter(or)
	for mututallyExclusiveInputs, count := range counts {
		if count > 1 {
			githubactions.Debugf("The following inputs must be provided together if any are provided: %v", mututallyExclusiveInputs)
			return fmt.Errorf("missing mutually exclusive inputs: %v", mututallyExclusiveInputs)
		}
	}

	return nil
}

func (i Inputs) requiredOr(requiredOr [][]string) error {
	if len(requiredOr) == 0 {
		return nil
	}

	githubactions.Debugf("Inputs that are mutually exclusive, and are required:")
	for _, mututallyExclusiveInputs := range requiredOr {
		githubactions.Debugf("\t%v", mututallyExclusiveInputs)
	}

	counts := i.orCounter(requiredOr)
	for mututallyExclusiveInputs, count := range counts {
		if count != 1 {
			githubactions.Debugf("The following inputs are required and must be provided together: %v", mututallyExclusiveInputs)
			return fmt.Errorf("missing required mutually exclusive inputs: %v", mututallyExclusiveInputs)
		}
	}

	return nil
}

func (i Inputs) orCounter(or [][]string) (count map[string]int) {
	count = map[string]int{}

	for _, mututallyExclusiveInputs := range or {
		contains := 0

		for _, input := range mututallyExclusiveInputs {
			if _, ok := i[input]; ok {
				contains++
			}
		}
		count[fmt.Sprintf("%v", mututallyExclusiveInputs)] = contains
	}

	return
}
