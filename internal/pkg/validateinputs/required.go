package validateinputs

import (
	"fmt"
	"strings"

	"github.com/sethvargo/go-githubactions"
)

func (i Inputs) required(required []string) error {
	if len(required) == 0 {
		return nil
	}

	githubactions.Debugf("Required inputs:\n%v", strings.Join(required, "\n\t"))

	missingInputs := []string{}

	for _, input := range required {
		if _, ok := i[input]; !ok {

			missingInputs = append(missingInputs, input)
		}
	}

	if len(missingInputs) > 0 {
		githubactions.Debugf("The following inputs are required and have not been provided: %v", missingInputs)
		return fmt.Errorf("missing required inputs: %v", missingInputs)
	}

	return nil
}
