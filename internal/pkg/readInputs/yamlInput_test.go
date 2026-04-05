package readinputs

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGetYAMLInput(t *testing.T) {
	t.Run("good yaml 1", func(t *testing.T) {
		input := "enum-input: [option-1, option-2]"
		unmarshal := map[string][]string{}
		expected := map[string][]string{"enum-input": {"option-1", "option-2"}}

		t.Setenv("INPUT_INPUT-NAME", input)
		require.NoError(t, GetYAMLInput("input-name", &unmarshal))

		assert.Equal(t, expected, unmarshal)
	})

	t.Run("good yaml 2", func(t *testing.T) {
		input := "- [input-1, input-2]"
		unmarshal := [][]string{}
		expected := [][]string{{"input-1", "input-2"}}

		t.Setenv("INPUT_INPUT-NAME", input)
		require.NoError(t, GetYAMLInput("input-name", &unmarshal))

		assert.Equal(t, expected, unmarshal)
	})

	t.Run("bad yaml", func(t *testing.T) {
		t.Setenv("INPUT_INPUT-NAME", "input: [ layer: value-in-enum ]")

		unmarshal := map[string][]string{}

		require.Error(t, GetYAMLInput("input-name", &unmarshal))
	})

	t.Run("unmarshalError", func(t *testing.T) {
		t.Setenv("INPUT_INPUT-NAME", "- name")
		unmarshal := map[string][]string{}

		require.Error(t, GetYAMLInput("input-name", &unmarshal))
	})
}
