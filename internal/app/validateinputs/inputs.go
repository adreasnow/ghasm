package validateinputs

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/adreasnow/ghasm/internal/pkg/validateinputs"
	"github.com/sethvargo/go-githubactions"
)

func getProvidedInputs() (inputs validateinputs.Inputs, err error) {
	rawInputs := githubactions.GetInput("inputs")
	if rawInputs == "" {
		err = errors.New("Required input 'inputs' is not provided")
		return nil, err
	}

	err = json.Unmarshal([]byte(rawInputs), &inputs)
	if err != nil {
		err = fmt.Errorf("Failed to parse input 'inputs': %w", err)
		return nil, err
	}

	githubactions.Debugf("Provided inputs:")
	for key, value := range inputs {
		githubactions.Debugf("\t%s: %s", key, value)
	}

	return
}
