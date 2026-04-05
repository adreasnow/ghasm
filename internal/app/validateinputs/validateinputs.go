package validateinputs

import (
	"fmt"
)

func ValidateInputs() (err error) {
	inputs, err := getProvidedInputs()
	if err != nil {
		return fmt.Errorf("error while getting provided inputs: %w", err)
	}

	requirements, err := getInputRequirements()
	if err != nil {
		return fmt.Errorf("error while getting input requirements: %w", err)
	}

	err = inputs.Validate(requirements)
	if err != nil {
		return fmt.Errorf("validation failed: %w", err)
	}

	return nil

}
