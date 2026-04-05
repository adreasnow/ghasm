package validateinputs

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestAnd(t *testing.T) {
	t.Parallel()

	t.Run("valid", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"input-2":   "value2",
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.NoError(t, inputs.and(validInputs))
	})

	t.Run("valid not supplied", func(t *testing.T) {
		inputs := Inputs{}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.NoError(t, inputs.and(validInputs))
	})

	t.Run("fail missing input", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.Error(t, inputs.and(validInputs))
	})

	t.Run("fail missing input on second set", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-a", "input-b"}, {"input-1", "input-2"}}

		require.Error(t, inputs.and(validInputs))
	})
}
