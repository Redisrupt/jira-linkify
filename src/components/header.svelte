<style>
.label {
  margin-left: 1rem;
}
.label input+span {
  color: #000;
  font-size: 14px;
}
</style>
<script>
  import { toggleStyles } from './../toggle-styles.js';

  let checked = false;

  $: toggleStyles(checked);
</script>
<label class="label">
  <input type="checkbox" bind:checked={checked} />
  <span>set max width</span>
</label>