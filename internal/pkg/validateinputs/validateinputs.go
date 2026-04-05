package validateinputs

import (
	"errors"
	"fmt"
)

type Inputs map[string]string
type Requirements struct {
	Required   []string
	Enum       map[string][]string
	And        [][]string
	Or         [][]string
	RequiredOr [][]string
}

func (i Inputs) Validate(requirements Requirements) (err error) {
	err = errors.Join(
		i.required(requirements.Required),
		i.enum(requirements.Enum),
		i.and(requirements.And),
		i.or(requirements.Or),
		i.requiredOr(requirements.RequiredOr),
	)
	if err != nil {
		err = fmt.Errorf("validation failed: %w", err)
	}

	return
}
