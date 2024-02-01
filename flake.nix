{
  description = "A very basic flake";

  outputs = { self, nixpkgs }: 
  let
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
  in {
    devShell.${system} = pkgs.mkShell {
      buildInputs =
        [
          pkgs.nodePackages_latest.typescript-language-server
          pkgs.nodePackages_latest.svelte-language-server
          pkgs.nodePackages_latest.svelte-check
          pkgs.nodejs
        ];
    };

  };
}
