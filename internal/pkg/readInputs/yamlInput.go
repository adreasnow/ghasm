package readinputs

import (
	"github.com/goccy/go-yaml"
	"github.com/sethvargo/go-githubactions"
)

func GetYAMLInput(input string, unmarshal interface{}) error {
	rawYAML := githubactions.GetInput(input)
	err := yaml.Unmarshal([]byte(rawYAML), unmarshal)

	return err
}
