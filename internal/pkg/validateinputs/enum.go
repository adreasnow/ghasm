package validateinputs

import (
	"fmt"
	"slices"

	"github.com/sethvargo/go-githubactions"
)

func (i Inputs) enum(enum map[string][]string) error {
	if len(enum) == 0 {
		return nil
	}

	githubactions.Debugf("Inputs that must be from a set:")
	for input, acceptedValues := range enum {
		githubactions.Debugf("\t%v: %v", input, acceptedValues)
	}

	for input, value := range i {
		if acceptedValues, ok := enum[input]; ok {
			if !slices.Contains(acceptedValues, value) {
				githubactions.Errorf("Provided input %v must be one of %v", input, acceptedValues)
				return fmt.Errorf("invalid input provided: %v not in %v", input, acceptedValues)
			}
		}
	}

	return nil
}
