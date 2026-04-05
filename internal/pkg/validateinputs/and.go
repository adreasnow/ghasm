package validateinputs

import (
	"fmt"

	"github.com/sethvargo/go-githubactions"
)

func (i Inputs) and(and [][]string) error {
	if len(and) == 0 {
		return nil
	}

	githubactions.Debugf("Inputs that are co-dependent:")
	for _, coDependentInputs := range and {
		githubactions.Debugf("\t%v", coDependentInputs)
	}

	for _, coDependentInputs := range and {
		contains := []string{}
		containsAll := true

		for _, input := range coDependentInputs {
			if _, ok := i[input]; ok {
				contains = append(contains, input)
			} else {
				containsAll = false
			}
		}

		if len(contains) > 0 && !containsAll {
			githubactions.Errorf("When specifying %v, you must also specify all these inputs together: %v", coDependentInputs, contains)
			return fmt.Errorf("co-dependent inputs not supplied together: %v", coDependentInputs)
		}
	}

	return nil
}
