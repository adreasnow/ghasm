package validateinputs

import (
	"encoding/json"
	"errors"

	"github.com/adreasnow/ghasm/internal/pkg/validateinputs"
	"github.com/sethvargo/go-githubactions"
)

var (
	NoInputsError      = errors.New("Required input 'inputs' is not provided")
	InvalidInputsError = errors.New("Failed to parse input 'inputs'")
)

func getProvidedInputs() (inputs validateinputs.Inputs, err error) {
	rawInputs := githubactions.GetInput("inputs")
	if rawInputs == "" {
		err = NoInputsError
		return nil, err
	}

	err = json.Unmarshal([]byte(rawInputs), &inputs)
	if err != nil {
		err = errors.Join(InvalidInputsError, err)
		return nil, err
	}

	githubactions.Debugf("Provided inputs:")
	for key, value := range inputs {
		githubactions.Debugf("\t%s: %s", key, value)
	}

	return
}
