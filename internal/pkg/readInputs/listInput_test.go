package readinputs

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestGetListInput(t *testing.T) {
	t.Run("valid", func(t *testing.T) {
		t.Setenv("INPUT_NAME", "value1 value2")

		out := []string{}
		require.NoError(t, GetListInput("name", true, &out))

		require.Equal(t, []string{"value1", "value2"}, out)
	})

	t.Run("not required", func(t *testing.T) {
		out := []string{}
		require.NoError(t, GetListInput("input-name", false, &out))

		require.Equal(t, []string{}, out)
	})

	t.Run("missing required", func(t *testing.T) {
		out := []string{}
		require.Error(t, GetListInput("input-name", true, &out))

		require.Equal(t, []string{}, out)
	})
}
