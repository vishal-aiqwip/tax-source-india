<?php
/**
 * The single HTML skeleton. Every page renders through here, so no page file
 * repeats the boilerplate.
 *
 * Expects: $config, $content, $page (set by index.php).
 */
?>
<!DOCTYPE html>
<html lang="en-IN">
<?php require __DIR__ . '/head.php'; ?>
<body class="bg-page font-body text-body antialiased overflow-x-hidden">

<a href="#main"
   class="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:top-3 focus:left-3 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg">
  Skip to content
</a>

<?php require __DIR__ . '/header.php'; ?>

<main id="main">
<?php require __DIR__ . '/../pages/' . $page . '.php'; ?>
</main>

<?php require __DIR__ . '/footer.php'; ?>

</body>
</html>
