package readinputs

import (
	"fmt"
	"strings"

	"github.com/sethvargo/go-githubactions"
)

func GetListInput(input string, required bool, unmarshal *[]string) error {
	rawInput := githubactions.GetInput(input)
	if rawInput == "" && required {
		return fmt.Errorf("required input %s is empty", input)
	}

	if rawInput != "" {
		*unmarshal = strings.Split(rawInput, " ")
	}

	return nil
}
