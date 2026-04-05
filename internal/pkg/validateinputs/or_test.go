package validateinputs

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestOr(t *testing.T) {
	t.Parallel()

	t.Run("valid", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"not-input": "value2",
		}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.NoError(t, inputs.or(validInputs))
		require.NoError(t, inputs.requiredOr(validInputs))
	})

	t.Run("fail multiple provided", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"input-2":   "value2",
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.Error(t, inputs.or(validInputs))
		require.Error(t, inputs.requiredOr(validInputs))
	})

	t.Run("fail multiple provided on second set", func(t *testing.T) {
		inputs := Inputs{
			"input-1":   "value1",
			"input-2":   "value2",
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-a", "input-b"}, {"input-1", "input-2"}}

		require.Error(t, inputs.or(validInputs))
		require.Error(t, inputs.requiredOr(validInputs))
	})

	t.Run("none provided", func(t *testing.T) {
		inputs := Inputs{
			"not-input": "value3",
		}
		validInputs := [][]string{{"input-1", "input-2"}}

		require.NoError(t, inputs.or(validInputs))
		require.Error(t, inputs.requiredOr(validInputs))
	})
}
